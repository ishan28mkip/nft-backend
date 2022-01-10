import { TranslationModel } from "../models/translations";

export const TranslationController = async (page: string): Promise<any> => {
  try {
    const results = await TranslationModel.find(
      {},
      {},
      { skip: +page * 10, limit: 10 }
    );
    return results;
  } catch (e) {
    console.log(e);
  }
};
