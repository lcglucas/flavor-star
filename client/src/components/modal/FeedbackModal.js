import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Button from "../ui/Button";
import ButtonSecondary from "../ui/ButtonSecondary";
import Label from "../ui/Label";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import DatePicker from "../ui/DatePicker";
import Alert from "../ui/Alert";
import api from "../../api/client";

export default function FeedbackModal({ open, setOpen, getRestaurant }) {
  const { id } = useParams();
  const [starValue, setStarValue] = useState(0);
  const [visitDate, setVisitDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!starValue || !title || !visitDate || !comment) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [starValue, title, visitDate, comment]);

  const onSubmit = async () => {
    try {
      setErrors([]);

      const token = localStorage.getItem("jwt");

      const payload = {
        restaurant_id: id,
        rating: starValue,
        visit_date: format(visitDate, "yyyy-MM-dd"),
        title,
        comment,
      };

      const { data } = await api.post("/reviews", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      onCancel();
      getRestaurant();
    } catch (error) {
      setErrors(error?.response?.data?.errors || []);
    }
  };

  const onCancel = () => {
    setStarValue(0);
    setTitle("");
    setComment("");
    setVisitDate("");
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
                    size={50}
                    count={5}
                    value={starValue}
                    onChange={setStarValue}
                  />
                </div>
                <div className="text-left mt-4">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="text-left mt-4">
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
                <div className="text-left mt-4 relative">
                  <DatePicker
                    date={visitDate}
                    setDate={setVisitDate}
                    placeholder={"Select the day of your visit"}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 mb-4">
              <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
              <Button onClick={onSubmit} disabled={disabled}>
                Send
              </Button>
            </div>
            <Alert errors={errors} setErrors={setErrors} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
