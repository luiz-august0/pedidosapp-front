'use client';

import React, { useState } from "react";
import "./styles.css";

export default function Page() {
  const [ tenant, setTenant ] = useState<string>();
  const [ login, setLogin ] = useState<string>();
  const [ password, setPassword ] = useState<string>();

  return (
    <div id="container">
      <h1>Sistema de pedidos V1.0</h1>
      <form className="form" onSubmit={() => {}}>
        <div className="field">
          <label htmlFor="tenant">Tenant de acesso</label>
          <input
            type="text"
            name="tenant"
            id="tenant"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            name="login"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button type="submit">
            {/* {!loading ? (
              `ENTRAR`
            ) : (
              <Oval
                height={25}
                width={25}
                color="#1976d2"
                wrapperStyle={{ justifyContent: "center" }}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#1976d2"
                strokeWidth={3}
                strokeWidthSecondary={3}
              />
            )} */}
          </button>
        </div>
      </form>
    </div>
  );
}
