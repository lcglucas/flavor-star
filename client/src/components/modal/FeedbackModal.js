import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Button from "../ui/Button";
import ButtonSecondary from "../ui/ButtonSecondary";
import Label from "../ui/Label";
import TextArea from "../ui/TextArea";
import DatePicker from "../ui/DatePicker";
import Alert from "../ui/Alert";
import api from "../../api/client";

export default function FeedbackModal({ open, setOpen }) {
  const [starValue, setStarValue] = useState(0);
  const [visitDate, setVisitDate] = useState(new Date());
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async () => {
    try {
      setErrors([]);

      const token = localStorage.getItem("jwt");

      const payload = {
        rating: starValue,
        visit_date: visitDate,
        comment,
      };

      await api.post("/reviews", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onCancel();
    } catch (error) {
      setErrors(error?.response?.data?.errors || []);
    }
  };

  const onCancel = () => {
    setStarValue(0);
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
            <div>
              <div className="text-center">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Give us your feedback
                </DialogTitle>
                <div className="mt-2 mx-auto w-fit">
                  <ReactStars
                    size={30}
                    count={5}
                    value={starValue}
                    onChange={setStarValue}
                  />
                </div>
                <div className="space-y-2 text-left mt-4">
                  <Label htmlFor="comment">Leave a comment</Label>
                  <TextArea
                    id="comment"
                    name="comment"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2 text-left mt-4 relative">
                  <DatePicker
                    date={visitDate}
                    setDate={setVisitDate}
                    placeholder={"Select the day of your visit"}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
              <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
              <Button onClick={onSubmit}>Send</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
