import { AccessResource, AccessRole, JwtPayload } from '@ip-resolver/shared/acl';
import { Permission } from 'nest-access-control';
import { builder } from '@ip-resolver/shared/acl';

export class AuthUser {
  constructor(private payload?: JwtPayload | false) {}

  get id(): string | undefined {
    return this.payload ? this.payload.sub : undefined;
  }

  get roles(): AccessRole[] {
    return [AccessRole.ANONYMOUS, ...((this.payload && this.payload.roles) || [])];
  }

  private getOwnership<T extends { owner_id: string }>(entity: T): 'own' | 'any' {
    return entity.owner_id == this.id ? 'own' : 'any';
  }

  public access<T extends { owner_id: string }>(
    action: 'create' | 'read' | 'update' | 'delete',
    entity: T | null,
    resource: AccessResource,
  ): Permission {
    const possession = entity ? this.getOwnership(entity) : 'any';
    const role = this.roles;
    const permission = builder.permission({ possession, resource, action, role });

    return permission;
  }

  public create<T extends { owner_id: string }>(entity: T | null, resource: AccessResource) {
    return this.access('create', entity, resource);
  }

  public read<T extends { owner_id: string }>(entity: T | null, resource: AccessResource) {
    return this.access('read', entity, resource);
  }

  public update<T extends { owner_id: string }>(entity: T | null, resource: AccessResource) {
    return this.access('update', entity, resource);
  }

  public delete<T extends { owner_id: string }>(entity: T | null, resource: AccessResource) {
    return this.access('delete', entity, resource);
  }
}
