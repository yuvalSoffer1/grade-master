export type CreateGradeItemPayload = {
  name: string;
  weight: number;
};

type UpdateGradeItemPayload = {
  gradeItemId: number;
  weight: number;
};

export type UpdateGradeItemsPayload = {
  gradeItemDtos: UpdateGradeItemPayload[];
};
