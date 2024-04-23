import { Repository, In } from 'typeorm';

export async function loadRelationships(
  repo: Repository<any>,
  relationships: string[],
  baseEntities: any[],
) {
  if (!baseEntities) {
    baseEntities = await repo.find({});
  }

  const baseEntityIds = baseEntities.map((entity) => entity.id).filter(Boolean);

  const { ...relatedEntities } = await Promise.all(
    relationships.map(async (relation) => {
      const related = await repo.find({
        where: { id: In(baseEntityIds) },
        relations: [relation],
      });

      return related;
    }),
  );

  Object.keys(relatedEntities).forEach((i) => {
    relatedEntities[i].forEach((r) => {
      const fullEntity = baseEntities.find((e) => e.id === r.id);
      if (fullEntity) {
        const relationship = relationships[i];
        fullEntity[relationship] = r[relationship];
      }
    });
  });
}
