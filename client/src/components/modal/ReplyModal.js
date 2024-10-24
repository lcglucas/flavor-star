import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import Button from "../ui/Button";
import ButtonSecondary from "../ui/ButtonSecondary";
import Label from "../ui/Label";
import TextArea from "../ui/TextArea";
import Alert from "../ui/Alert";
import api from "../../api/client";

export default function ReplyModal({
  open,
  setOpen,
  idReview,
  getRestaurant,
  reply,
  update,
  setUpdate,
  idRestaurant,
}) {
  const [replyValue, setReplyValue] = useState(reply || "");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setReplyValue(reply || "");
  }, [reply]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { reply } = e.target.elements;

    try {
      setErrors([]);

      const token = localStorage.getItem("jwt");

      const url = update
        ? `/reviews/${idReview}/reply`
        : `/restaurants/${idRestaurant}/reviews/${idReview}`;

      await api.patch(
        url,
        { reply: reply.value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onCancel();
      getRestaurant();
      setUpdate(false);
    } catch (error) {
      setErrors(error?.response?.data?.errors || []);
    }
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
          <DialogPanel
            transition
            className="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-full"
          >
            <form onSubmit={onSubmit}>
              <div className="text-left mt-4">
                <Label htmlFor="reply">Your reply</Label>
                <TextArea
                  id="reply"
                  name="reply"
                  type="text"
                  rows={4}
                  required
                  value={replyValue}
                  onChange={(e) => setReplyValue(e.target.value)}
                />
              </div>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 mb-4">
                <ButtonSecondary onClick={onCancel} type="button">
                  Cancel
                </ButtonSecondary>
                <Button type="submit">Send</Button>
              </div>
            </form>
            <Alert errors={errors} setErrors={setErrors} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
