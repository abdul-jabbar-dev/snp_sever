UPDATE user_management
SET
    refreshToken = @refreshToken
WHERE user_id = @user_id;
