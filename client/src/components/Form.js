import React from "react";

export default function Form() {
  return (
    <>
      <form action="#" class="w-75">
        <div class="np-form-group">
          <label for="np-element">Pseudo</label>
            <input type="text" class="np-form-element np-text-accent" value=""/>
        </div>
        <div class="np-form-group">
          <label for="np-element">Nom de la room</label>
            <input type="text" class="np-form-element np-text-accent" value=""/>
        </div>
        <button type="submit" class="np-btn np-circle-sm">+</button>
      </form>
    </>
  );
}