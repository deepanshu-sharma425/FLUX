-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female', 'Unisex');

-- CreateTable
CREATE TABLE "Cloth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sizes" TEXT[],
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "finalPrice" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "about" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cloth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothDetails" (
    "id" SERIAL NOT NULL,
    "material" TEXT NOT NULL,
    "fit" TEXT NOT NULL,
    "clothId" INTEGER NOT NULL,

    CONSTRAINT "ClothDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClothDetails_clothId_key" ON "ClothDetails"("clothId");

-- AddForeignKey
ALTER TABLE "ClothDetails" ADD CONSTRAINT "ClothDetails_clothId_fkey" FOREIGN KEY ("clothId") REFERENCES "Cloth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
