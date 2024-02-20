import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Workspaces')
@Controller({
  path: 'workspaces',
  version: '1',
})
export class WorkspacesController {
  // GET /workspaces
  @Get()
  getWorkspaces() {
    return 'All workspaces';
  }
}
