const asyncHandler = (requestHandler) => async () => {
   try {
      await requestHandler();
   } catch (error) {
      console.log(error);
   }
};

export { asyncHandler };
