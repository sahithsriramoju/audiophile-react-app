import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../../redux/authSlice";
import type { AppDispatch } from "../../redux/appStore";

export function AuthBootstrapper() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);
  return null;
}