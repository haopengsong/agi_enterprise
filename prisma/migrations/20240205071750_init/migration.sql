-- CreateTable
CREATE TABLE "PromptStorage" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromptStorage_pkey" PRIMARY KEY ("id")
);
