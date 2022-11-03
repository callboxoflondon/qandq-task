import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { run } from "node:test";

export default function MovieDetailForms({
  url,
  movieId,
}: {
  url: string;
  movieId: string;
}) {
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const [commentsList, setCommentsList] = useState<MovieComment[]>(comments);
  const hasComment = commentsList.some((comment) => comment.id === movieId);
  const [disabled, setDisabled] = useState<boolean>(hasComment);

  useEffect(() => {
    if (hasComment) {
      setComment(
        commentsList.find((comment) => comment.id === movieId)?.comment!
      );
    }
  }, []);

  function submitComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (hasComment && !disabled) {
      setCommentsList((oldComments) => {
        let newComments = oldComments.filter(
          (comment) => comment.id !== movieId
        );
        newComments.push({ id: movieId, comment });
        localStorage.setItem("comments", JSON.stringify(newComments));
        setDisabled(true);
        return newComments;
      });
    } else if (disabled) {
      setDisabled(false);
    } else {
      setCommentsList((oldComments) => {
        let newComments = [...oldComments, { id: movieId, comment }];
        localStorage.setItem("comments", JSON.stringify(newComments));
        setDisabled(true);
        return newComments;
      });
    }
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.EMAIL_SERVICE_ID!,
        "template_honkiy8",
        {
          email,
          url,
        },
        process.env.EMAIL_PUBLIC_KEY!
      )
      .then(
        (result) => {
          result.status === 200 && alert("Email sent successfully");
        },
        (error) => {
          alert("Email not sent");
        }
      );
  };

  return (
    <div>
      <form onSubmit={sendEmail} className="text-xs md:text-lg">
        <label className="text-secondary mt-2 ">
          Did you like the movie? Advise it to your friends!
        </label>
        <div className="flex">
          <input
            type="email"
            required
            name="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-2  bg-tertiary rounded-md  w-full h-full focus:outline-none ring-0   "
          />
          <button
            type={"submit"}
            className="px-2 py-1 ml-2  rounded-md bg-secondary  "
          >
            Advise
          </button>
        </div>
      </form>

      <form
        onSubmit={submitComment}
        className="mt-2 flex text-xs md:text-lg flex-col"
      >
        <label className="text-secondary mt-2 ">Leave a comment</label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          className="outline-none bg-tertiary rounded-t-md px-2 py-2"
          disabled={disabled}
        />
        <button
          type={"submit"}
          className="px-2 py-1 rounded-b-md bg-secondary  "
        >
          {disabled ? "Edit comment" : "Submit comment"}
        </button>
      </form>
    </div>
  );
}
