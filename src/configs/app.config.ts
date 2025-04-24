export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  enableMock: boolean;
};

const appConfig: AppConfig = {
  apiPrefix: "/",
  authenticatedEntryPath: "/app/devices",
  unAuthenticatedEntryPath: "/sign-in",
  locale: "en",
  enableMock: false,
};

export default appConfig;
