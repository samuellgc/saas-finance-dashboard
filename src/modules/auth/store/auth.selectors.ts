import type { RootState } from "@/shared/store";

export const selectAuthState = (state: RootState) => state.auth;
export const selectAuthenticatedUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;
