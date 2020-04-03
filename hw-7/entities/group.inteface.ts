export type GroupPermission = 'READ'|'WRITE'|'DELETE'|'SHARE'|'UPLOAD_FILES';

/** Group definition. */
export interface Group {
  id: string;
  name: string;
  permissions: Array<GroupPermission>;
}