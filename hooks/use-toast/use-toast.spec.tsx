import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Toaster } from "~/components/ui";
import useToast from "./use-toast";

describe("useToast", () => {
  it("shows a toast when toast() is called", async () => {
    const user = userEvent.setup();

    function Demo() {
      const { toast } = useToast();
      return <button onClick={() => toast("Event created")}>Show</button>;
    }

    render(
      <>
        <Demo />
        <Toaster />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Show" }));

    expect(await screen.findByText("Event created")).toBeInTheDocument();
  });

  it("shows a success toast when success() is called", async () => {
    const user = userEvent.setup();

    function Demo() {
      const { success } = useToast();
      return (
        <button onClick={() => success("Changes saved")}>Show success</button>
      );
    }

    render(
      <>
        <Demo />
        <Toaster />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Show success" }));

    expect(await screen.findByText("Changes saved")).toBeInTheDocument();
  });

  it("shows an error toast with a description when error() is called", async () => {
    const user = userEvent.setup();

    function Demo() {
      const { error } = useToast();
      return (
        <button
          onClick={() =>
            error("Something went wrong", { description: "Please retry" })
          }
        >
          Show error
        </button>
      );
    }

    render(
      <>
        <Demo />
        <Toaster />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Show error" }));

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Please retry")).toBeInTheDocument();
  });

  it("dismisses a toast by id when dismiss() is called", async () => {
    const user = userEvent.setup();

    function Demo() {
      const { toast, dismiss } = useToast();
      return (
        <>
          <button onClick={() => toast("Dismiss me", { id: "demo-toast" })}>
            Show
          </button>
          <button onClick={() => dismiss("demo-toast")}>Dismiss</button>
        </>
      );
    }

    render(
      <>
        <Demo />
        <Toaster />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    const toastEl = await screen.findByText("Dismiss me");

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    await waitForElementToBeRemoved(toastEl);
  });
});
