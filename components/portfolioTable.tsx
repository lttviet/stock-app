import { Card, CardContent, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { doc } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'
import History from '../components/history'
import Layout from '../components/layout'
import useRequireAuth from '../hooks/useRequireAuth'
import Link from './link'

const stocks = [
  {
    symbol: "AAPL",
    quantity: 23,
    averageCost: 12.11,
    currentPrice: 123.33
  },
  {
    symbol: "TSLA",
    quantity: 12,
    averageCost: 3,
    currentPrice: 4.5
  }
]

const PortfolioTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Average Cost</TableCell>
            <TableCell align="right">Current Price</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {stocks.map((s) => (
            <TableRow key={s.symbol}>
              <TableCell>
                <Link href={`/stocks/${s.symbol}`}>{s.symbol}</Link>
              </TableCell>
              <TableCell align="right">{s.quantity}</TableCell>
              <TableCell align="right">{s.averageCost}</TableCell>
              <TableCell align="right">{s.currentPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PortfolioTable
