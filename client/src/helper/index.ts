/* eslint-disable @typescript-eslint/no-explicit-any */
export const catchError = (error: any) => {
  const { response } = error;

  if (response?.data) {
    return response?.data;
  }

  return { error: error.message || error };
};
