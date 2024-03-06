// utils/withAuth.tsx

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

interface WithAdminProps {
  // Add any additional props that your wrapped component might receive here
}

const adminAuth = <P extends WithAdminProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const router = useRouter();

    // Get the token from the cookie
    const token = getCookie("token");

    // Check if the token is valid (replace this with your actual authentication check)
    const authenticated = !!token; // Assumes token is valid if it exists
    const authenticatedUser = {
      username: "JohnDoe",
      // ... other user data ...
    };

    useEffect(() => {
      // Redirect to login page if not authenticated
      if (!authenticated) {
        router.push("/login");
      }
    }, [authenticated, router]);

    // Merge the additional data with the existing props
    const mergedProps = { ...props, ...authenticatedUser };

    // Render the component if authenticated, or null if not
    return authenticated ? <WrappedComponent {...mergedProps} /> : null;
  };
};
adminAuth.displayName = "adminAuth";
export default adminAuth;
