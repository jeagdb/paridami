import React from "react";

export default function DealList({ deals }) {
  return (
    <>
      <h1>🚪 Mes Paridamis 🚪</h1>
      {deals.forEach(deal => {
        return <p>{deal}</p>
        })
      }
    </>
  )
}