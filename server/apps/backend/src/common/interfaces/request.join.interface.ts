import { Organization, RequestJoin, User } from '@/common/entities';

type RequestSelectionBy = 'organization' | 'users';

interface RequestJoinInterface {
  getAll(id: number, selection: RequestSelectionBy): Promise<RequestJoin[]>;
  getRequestById(requestId: number): Promise<RequestJoin>;
  createNewRequest(organization: Organization, user: User);
  deleteById(requestId: number);
  deletAllBy(id: number, selection: RequestSelectionBy);
}

export { RequestJoinInterface, RequestSelectionBy };
