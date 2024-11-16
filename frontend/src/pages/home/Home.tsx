import { useEffect } from "react"
import { useMenuContext } from "../../shared/contexts"
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const { setIsMenuHidden } = useMenuContext()
    // setIsMenuHidden(true)

    const navigate = useNavigate()
    // useEffect(() => setIsMenuHidden(true), [])
    return (
        <h1>Home</h1>
    )
}