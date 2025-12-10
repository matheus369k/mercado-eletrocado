import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { it } from 'vitest';
import { describe } from 'vitest';
import { useConfigsProfile } from './use-profile';
import { axiosBackEndAPI } from '@/lib/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { expect } from 'vitest';
import { vi } from 'vitest';
import { toast } from 'react-toastify';
import { ROUTES_PATHNAMES } from '@/util/const';
import { afterEach } from 'vitest';
import { beforeEach } from 'vitest';

const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

vi.mock('react-toastify');
vi.mock('react-router-dom');

describe('profile custom hook', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const authorizationTokenRoute = '/token';
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
  });

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  describe('delete account function', () => {
    const deleteAccountRoute = '/api/users/delete';

    it('should delete account data and redirected to home page when call handleDeleteAccount', async () => {
      axiosFetch.onDelete(deleteAccountRoute).reply(200);
      axiosFetch.onDelete(authorizationTokenRoute).reply(200);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(result.current.handleDeleteAccount);

      const deleteAccountRequest = axiosFetch.history[0];
      expect(deleteAccountRequest).includes({ url: deleteAccountRoute, method: 'delete' });
      const deleteAuthTokenRequest = axiosFetch.history[1];
      expect(deleteAuthTokenRequest).includes({
        url: authorizationTokenRoute,
        method: 'delete',
      });
      expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.HOME);
      expect(toast.error).toBeCalledTimes(0);
    });

    it('no should recall delete account request when generate new auth token fall request', async () => {
      axiosFetch.onDelete(deleteAccountRoute).replyOnce(401);
      axiosFetch.onDelete(deleteAccountRoute).reply(200);
      axiosFetch.onDelete(authorizationTokenRoute).reply(200);
      axiosFetch.onGet(authorizationTokenRoute).reply(401);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(result.current.handleDeleteAccount);

      const deleteAccountRequest = axiosFetch.history[0];
      expect(deleteAccountRequest).includes({ url: deleteAccountRoute, method: 'delete' });
      const generateNewAccessTokenRequest = axiosFetch.history[1];
      expect(generateNewAccessTokenRequest).includes({
        url: authorizationTokenRoute,
        method: 'get',
      });
      const recallDeleteAccountRequest = axiosFetch.history[2];
      expect(recallDeleteAccountRequest).toBeUndefined();
    });

    it('should alert mensagem when call handleDeleteAccount and receive error', async () => {
      axiosFetch.onDelete(deleteAccountRoute).replyOnce(401);
      axiosFetch.onDelete(deleteAccountRoute).reply(200);
      axiosFetch.onGet(authorizationTokenRoute).reply(401);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(result.current.handleDeleteAccount);

      expect(toast.error).toBeCalledTimes(1);
    });
  });

  describe('logout account function', () => {
    const logoutAccountRoute = '/api/users/logout';

    it('should logout data and redirected to home page when call handleLogOut', async () => {
      axiosFetch.onDelete(logoutAccountRoute).reply(200);
      axiosFetch.onDelete(authorizationTokenRoute).reply(200);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(result.current.handleLogOut);

      const logoutAccountRequest = axiosFetch.history[0];
      expect(logoutAccountRequest).includes({ url: logoutAccountRoute, method: 'delete' });
      const deleteAuthTokenRequest = axiosFetch.history[1];
      expect(deleteAuthTokenRequest).includes({ url: authorizationTokenRoute, method: 'delete' });
      expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.HOME);
      expect(toast.error).toBeCalledTimes(0);
    });

    it('no should recall logout request when generate new auth token fall request', async () => {
      axiosFetch.onDelete(logoutAccountRoute).replyOnce(401);
      axiosFetch.onDelete(logoutAccountRoute).reply(200);
      axiosFetch.onDelete(authorizationTokenRoute).reply(200);
      axiosFetch.onGet(authorizationTokenRoute).reply(401);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(result.current.handleLogOut);

      const logoutAccountRequest = axiosFetch.history[0];
      expect(logoutAccountRequest).includes({ url: logoutAccountRoute, method: 'delete' });
      const generateNewAccessTokenRequest = axiosFetch.history[1];
      expect(generateNewAccessTokenRequest).includes({
        url: authorizationTokenRoute,
        method: 'get',
      });
      const recallLogoutAccountRequest = axiosFetch.history[2];
      expect(recallLogoutAccountRequest).toBeUndefined();
    });

    it('should alert mensagem when call handleLogOut and receive error', async () => {
      axiosFetch.onDelete(logoutAccountRoute).replyOnce(401);
      axiosFetch.onDelete(logoutAccountRoute).reply(200);
      axiosFetch.onGet(authorizationTokenRoute).reply(401);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(result.current.handleLogOut);

      expect(toast.error).toBeCalledTimes(1);
    });
  });

  describe('update account function', () => {
    const updateAccountRoute = '/api/users/update';

    it('should update account data and redirected to home page when call handleUpdateProfile', async () => {
      axiosFetch.onPatch(updateAccountRoute).reply(200);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(() => result.current.handleUpdateProfile(new FormData()));

      const updateAccountRequest = axiosFetch.history[0];
      expect(updateAccountRequest.url).toBe(updateAccountRoute);
      expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.USER_PROFILER);
      expect(toast.error).toBeCalledTimes(0);
    });

    it('no should recall update request when generate new auth token fall request', async () => {
      axiosFetch.onPatch(updateAccountRoute).replyOnce(401);
      axiosFetch.onPatch(updateAccountRoute).reply(200);
      axiosFetch.onDelete(authorizationTokenRoute).reply(200);
      axiosFetch.onGet(authorizationTokenRoute).reply(401);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(() => result.current.handleUpdateProfile(new FormData()));

      const updateAccountRequest = axiosFetch.history[0];
      expect(updateAccountRequest).includes({ url: updateAccountRoute, method: 'patch' });
      const generateNewAccessTokenRequest = axiosFetch.history[1];
      expect(generateNewAccessTokenRequest).includes({
        url: authorizationTokenRoute,
        method: 'get',
      });
      const recallUpdateAccountRequest = axiosFetch.history[2];
      expect(recallUpdateAccountRequest).toBeUndefined();
    });

    it('should alert mensagem when call handleUpdateProfile and receive error', async () => {
      axiosFetch.onPatch(updateAccountRoute).reply(401);
      axiosFetch.onGet(authorizationTokenRoute).reply(401);
      const { result } = renderHook(useConfigsProfile, { wrapper });

      await waitFor(() => result.current.handleUpdateProfile(new FormData()));

      expect(toast.error).toBeCalledTimes(1);
    });
  });
});
