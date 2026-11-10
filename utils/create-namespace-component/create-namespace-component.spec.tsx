import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ReactNode } from "react";
import { createNamespaceComponent } from "./create-namespace-component";

function Card({ children }: { children: ReactNode }) {
  return <div data-testid="card">{children}</div>;
}

function CardHeader({ children }: { children: ReactNode }) {
  return <h2>{children}</h2>;
}

function CardBody({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

const NamespacedCard = createNamespaceComponent(Card, {
  Header: CardHeader,
  Body: CardBody,
});

describe("createNamespaceComponent", () => {
  it("exposes each part as a property on the root component", () => {
    expect(NamespacedCard.Header).toBe(CardHeader);
    expect(NamespacedCard.Body).toBe(CardBody);
  });

  it("renders the root and its namespaced parts together, as a consumer would", () => {
    render(
      <NamespacedCard>
        <NamespacedCard.Header>Title</NamespacedCard.Header>
        <NamespacedCard.Body>Body copy</NamespacedCard.Body>
      </NamespacedCard>,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
  });
});
