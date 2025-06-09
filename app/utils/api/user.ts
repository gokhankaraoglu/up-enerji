import { User } from "@/app/types";
import { getWithCustomBase } from ".";
import { userToCredentials } from "..";

export const getUserInfo = async (uniqueId: string | null) => {
  if (!uniqueId || uniqueId === "null") {
    return undefined;
  }

  try {
    const response = await getWithCustomBase<{ data: User }>(
      `/upenerji/user?uniqueId=${uniqueId}`,
      process.env.NEXT_PUBLIC_FINSURETEXT_API_URL ?? ""
    );
    const user = response.data;
    if (!user) {
      return undefined;
    }

    const formattedUser = userToCredentials(user);
    return formattedUser;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return undefined;
  }
};
