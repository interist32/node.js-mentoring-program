import {User} from '@app-models/user.interface';
import {Request, Response} from 'express';

import {HTTP_ERROR} from '../constants/http-errors.enum';
import UserFakeRepository from '../data-access/repositories/user-fake.repository';
import UsersService from '../services/users.service';

import {UsersController} from './users.controller';

jest.mock('../services/users.service');

describe('Users Controller', () => {
  let service: UsersService;
  let controller: UsersController;
  let responseMock: Response;

  beforeEach(() => {
    service = new UsersService(new UserFakeRepository());
    controller = new UsersController(service);
    responseMock = getMockedResponse();
  });

  describe('getUsers()', () => {
    it('returns users', async () => {
      let getUsersSpy = jest.spyOn(service, 'getUsers');
      const retUsers = [
        getUser(1, 'testUser1', 23),
        getUser(2, 'testUser2', 32),
      ];
      getUsersSpy.mockResolvedValue(retUsers);

      await controller.getUsers(
          {query: {login: 'testuser'}} as Request, responseMock);

      expect(getUsersSpy).toHaveBeenCalled();
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(retUsers);
    });
  });

  describe('getUser()', () => {
    it('returns user', async () => {
      const getUserByIdSpy = jest.spyOn(service, 'getUserById');
      const user = getUser(1, 'testUser', 23);
      getUserByIdSpy.mockResolvedValue(user);

      await controller.getUser(
          {params: {id: '1'}} as unknown as Request, responseMock)

      expect(getUserByIdSpy).toHaveBeenCalledWith('1');
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(user);
    });

    it('returns null if no such user', async () => {
      const getUserByIdSpy = jest.spyOn(service, 'getUserById');
      getUserByIdSpy.mockResolvedValue(null);

      await controller.getUser(
          {params: {id: '1'}} as unknown as Request, responseMock)

      expect(getUserByIdSpy).toHaveBeenCalledWith('1');
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(null);
    });
  });

  describe('addUser()', () => {
    it('returns added user', async () => {
      const addUserSpy = jest.spyOn(service, 'add');
      const user = getUser(1, 'testUser', 32) as User;
      addUserSpy.mockResolvedValue(user);

      await controller.addUser(
          {
            body: {...user},
          } as unknown as Request,
          responseMock)

      expect(addUserSpy).toHaveBeenCalledWith(user);
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(user);
    });

    it('returns error if such user exists', async (done) => {
      const addUserSpy = jest.spyOn(service, 'add');
      const user = getUser(1, 'testUser', 32) as User;
      addUserSpy.mockRejectedValue(new Error('Nooo!'));

      await controller.addUser(
          {
            body: {...user},
          } as unknown as Request,
          responseMock);

      expect.assertions(4);
      process.nextTick(() => {
        expect(addUserSpy).toHaveBeenCalledWith(user);
        expect(responseMock.json).toHaveBeenCalledTimes(1);
        expect(responseMock.status)
            .toHaveBeenCalledWith(HTTP_ERROR.INTERNAL_SERVER_ERROR);
        expect(responseMock.json).toHaveBeenCalledWith({error: 'Nooo!'});
        done();
      })
    });
  });

  describe('updateUser()', () => {
    it('returns updated user', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const user = getUser(1, 'testUser', 23);

      updateSpy.mockResolvedValue(user);

      await controller.updateUser(
          {
            params: {id: '1'},
            body: {
              ...user,
            },
          } as unknown as Request,
          responseMock)

      expect(updateSpy).toHaveBeenCalledWith({...user, id: '1'});
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(user);
    });
  });

  describe('deleteUser()', () => {
    it('returns removed user', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const user = getUser(1, 'testUser', 23);

      removeSpy.mockResolvedValue(user);

      await controller.deleteUser(
          {
            params: {id: '1'},
          } as unknown as Request,
          responseMock)

      expect(removeSpy).toHaveBeenCalledWith('1');
      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(responseMock.json).toHaveBeenCalledWith(user);
    });
  });
});

function getMockedResponse(): Response {
  return {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
}

function getUser(id: string|number, login: string, age: number): Partial<User> {
  return {
    id: id.toString(),
    login,
    age,
  };
}