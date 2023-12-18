import React from "react";
import PropTypes from "prop-types";
import { Routes } from "../../components";

const InvoiceRoutes = ({ routes }) => {
  return <Routes routes={routes} />;
};

export default InvoiceRoutes;

InvoiceRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};
