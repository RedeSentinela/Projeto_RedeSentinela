import { useState } from "react";

export function useTogglePassword() {
    const [showPassword, setShowPassword] = useState(false);

    function toggle() {
        setShowPassword((prev) => !prev);
    }

    return { showPassword, toggle };
}