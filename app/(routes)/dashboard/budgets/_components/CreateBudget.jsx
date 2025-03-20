"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/dbConfig";
import { Budgets } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { toast } from "sonner";

function CreateBudget() {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });
    if (result) {
      toast("🎉 New Budget Created!", {
        style: {
          backgroundColor: "#ec4899",
          color: "white",
          fontSize: "18px",
          padding: "16px",
          borderRadius: "8px"
        },
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-pink-100 p-10 rounded-md
            items-center flex flex-col border-2 border-dashed border-pink-200
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl font-extrabold text-pink-400 p-2">+</h2>
            <h2 className="text-pink-400 font-bold">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-pink-400">Create New Budget</DialogTitle>
          </DialogHeader>
          <div>
            <Button
              variant="outline"
              className="text-lg border-pink-400 bg-white"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emojiIcon}
            </Button>
            <div className="absolute">
              <EmojiPicker
                open={openEmojiPicker}
                onEmojiClick={(e) => {
                  setEmojiIcon(e.emoji);
                  setOpenEmojiPicker(false);
                }}
              />
            </div>
            <div className="mt-2">
              <h2 className="text-pink-400 font-medium my-1">Budget Name</h2>
              <Input
                placeholder="e.g. Home Decor"
                onChange={(e) => setName(e.target.value)}
                className="border-pink-400 focus:ring-pink-500"
              />
            </div>
            <div className="mt-2">
              <h2 className="text-pink-400 font-medium my-1">Budget Amount</h2>
              <Input
                type="number"
                placeholder="e.g. $5000"
                onChange={(e) => setAmount(e.target.value)}
                className="border-pink-400 focus:ring-pink-500"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full bg-pink-400 text-white hover:bg-pink-500 disabled:opacity-50"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
