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

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

vi.mock('react-toastify');
vi.mock('react-router-dom');

describe('profile custom hook', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const deleteAccountRoute = '/api/users/delete';
  const logoutAccountRoute = '/api/users/logout';
  const updateAccountRoute = '/api/users/update';
  const authorizationTokenRoute = '/token';

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should delete account data and redirected to home page when call handleDeleteAccount', async () => {
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onDelete(authorizationTokenRoute).reply(200);
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    const { result } = renderHook(useConfigsProfile, { wrapper });

    await waitFor(() => result.current.handleDeleteAccount());

    expect(axiosFetch.history[0].url).toBe(deleteAccountRoute);
    expect(axiosFetch.history[1].url).toBe(authorizationTokenRoute);
    expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.HOME);
    expect(toast.error).toBeCalledTimes(0);
  });

  it('should alert mensagem when call handleDeleteAccount and receive error', async () => {
    axiosFetch.onDelete(deleteAccountRoute).replyOnce(401);
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onGet(authorizationTokenRoute).reply(401);
    const { result } = renderHook(useConfigsProfile, { wrapper });

    await waitFor(() => result.current.handleDeleteAccount());

    expect(toast.error).toBeCalledTimes(1);
  });

  it('should logout account data and redirected to home page when call handleLogOut', async () => {
    axiosFetch.onDelete(logoutAccountRoute).reply(200);
    axiosFetch.onDelete(authorizationTokenRoute).reply(200);
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    const { result } = renderHook(useConfigsProfile, { wrapper });

    await waitFor(() => result.current.handleLogOut());

    expect(axiosFetch.history[0].url).toBe(logoutAccountRoute);
    expect(axiosFetch.history[1].url).toBe(authorizationTokenRoute);
    expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.HOME);
    expect(toast.error).toBeCalledTimes(0);
  });

  it('should alert mensagem when call handleLogOut and receive error', async () => {
    axiosFetch.onDelete(logoutAccountRoute).replyOnce(401);
    axiosFetch.onDelete(logoutAccountRoute).reply(200);
    axiosFetch.onGet(authorizationTokenRoute).reply(401);
    const { result } = renderHook(useConfigsProfile, { wrapper });

    await waitFor(() => result.current.handleLogOut());

    expect(toast.error).toBeCalledTimes(1);
  });

  it('should update account data and redirected to home page when call handleUpdateProfile', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(200);
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    const { result } = renderHook(useConfigsProfile, { wrapper });

    await waitFor(() => result.current.handleUpdateProfile(new FormData()));

    expect(axiosFetch.history[0].url).toBe(updateAccountRoute);
    expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.USER_PROFILER);
    expect(toast.error).toBeCalledTimes(0);
  });

  it('should alert mensagem when call handleUpdateProfile and receive error', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(401);
    axiosFetch.onGet(authorizationTokenRoute).reply(401);
    const { result } = renderHook(useConfigsProfile, { wrapper });

    await waitFor(() => result.current.handleUpdateProfile(new FormData()));

    expect(toast.error).toBeCalledTimes(1);
  });
});
