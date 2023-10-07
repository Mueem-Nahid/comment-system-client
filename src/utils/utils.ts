export const formatDate = (date: Date): string => {
   const createdAtDate = new Date(date);
   return createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
}