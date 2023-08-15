import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useUser as useSupaUser,
  useSessionContext,
} from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    isLoading: isLoadingUser,
    session,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setUserSubscription] = useState<Subscription | null>(
    null
  );
  const getUserDetails = () => supabase.from("users").select("*").single();
  const getUserSubscription = () =>
    supabase
      .from("subscriptions")
      .select(`*, prices(*, products(*))`)
      .in(`status`, ["trailing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getUserSubscription()]).then(
        (response) => {
          const userDetailsResponse = response[0];
          const userSubscriptionResponse = response[1];

          if (userDetailsResponse.status === "fulfilled") {
            setUserDetails(userDetailsResponse.value.data as UserDetails);
          }
          if (userSubscriptionResponse.status === "fulfilled") {
            setUserSubscription(
              userSubscriptionResponse.value.data as Subscription
            );
          }
          setIsLoadingData(false);
        }
      );
    } else if (!isLoadingData && !user && !isLoadingUser) {
      setUserSubscription(null);
      setUserDetails(null);
    }
  }, [user, isLoadingData]);
  const value = {
    user,
    userDetails,
    subscription,
    accessToken,
    isLoading: isLoadingData || isLoadingUser,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useuser is not within MyContextProvider");
  }
  return context;
};
