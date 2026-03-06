-- CreateIndex
CREATE INDEX "refresh_token_tokenHash_idx" ON "refresh_token"("tokenHash");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");
