// import { getCurrentInstance } from 'vue';
// import { EEnvType } from '@enum';

// const noCurrentInstanceLog = (): void => {
//   if (!getCurrentInstance()) {
//     if (APP_ENV.ENV === EEnvType.test) {
//       throw new CsError('[vue-hook]: Missing current instance. hook must be called inside <script setup> or setup().');
//     }
//   }
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createHook = <T extends (...args: any[]) => any>(hook: T): T =>
  ((...args: Parameters<T>): ReturnType<T> => {
    noCurrentInstanceLog();
    return hook(...args);
  }) as T;

export { createHook };
