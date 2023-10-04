import { useCallback, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { isNil } from 'ramda';
import { clsx } from 'clsx';

import { TokenPanel } from '../token-panel'
import { DetailsPanel } from '../details-panel';
import { useAppContext } from '../app-context';
import classes from './swarp-form.module.scss'

export const SwapForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<{ field: string, message: string }[]>([])
  const {
    token1, setToken1, amount1, setAmount1,
    token2, setToken2, amount2, setAmount2,
  } = useAppContext()

  const switchTokens = useCallback(() => {
    setToken1(token2)
    setToken2(token1)

    setAmount1(amount2)
    setAmount2(amount1)
  },
    [token1, token2, amount1, amount2]
  )

  const onSwap = useCallback(
    () => {
      setIsProcessing(true)
      const currentErrors: { field: string, message: string }[] = []
      if (isNil(token1)) {
        currentErrors.push({
          field: 'token1',
          message: 'First token is not selected'
        })
      }
      if (isNil(token2)) {
        currentErrors.push({
          field: 'token2',
          message: 'Second token is not selected'
        })
      }
      if (isNil(amount1) || amount1 === 0) {
        currentErrors.push({
          field: 'amount1',
          message: 'Amount is not correct'
        })
      }
      else if (isNil(amount2) || amount2 === 0) {
        currentErrors.push({
          field: 'amount2',
          message: 'Amount is not correct'
        })
      }
      setErrors(currentErrors)
      if (currentErrors.length === 0) {
        setTimeout(() => {
          alert('Swap successfully')
          setIsProcessing(false)
        }, 2000);
      }
    },
    [token1, token2, amount1, amount2]
  )

  return (
    <main className={classes.container}>
      <div className='flex justify-between items-center px-4 mb-3'>
        <div className='flex flex-row gap-3'>
          <div>
            Swap
          </div>
        </div>
        <div>
          <button
            disabled
            className='p-0 cursor-not-allowed'
          >
            <SettingsIcon fontSize='small' />
          </button>
        </div>
      </div>
      <TokenPanel
        label="You pay"
        token={token1}
        onChange={(token) => {
          setToken1(token)
          if (!isNil(token2)) {
            if (!isNil(amount1)) {
              setAmount2(amount1 * token.price / token2.price)
            } else if (!isNil(amount2)) {
              setAmount1(amount2 * token2.price / token.price)
            }
          }
        }}
        value={amount1}
        onChangeValue={amount => {
          setAmount1(amount)
          if (!isNil(amount) && !isNil(token1) && !isNil(token2)) {
            const newAmount2 = amount * token1.price / token2.price
            if (newAmount2 !== amount2)
              setAmount2(newAmount2)
          }
        }}
      />
      <button className={classes.btnSwitchTokens} onClick={switchTokens}>
        <ArrowDownwardIcon fontSize='small' />
      </button>
      <TokenPanel label="You receive"
        token={token2}
        onChange={(token) => {
          setToken2(token)
          if (!isNil(token1)) {
            if (!isNil(amount1)) {
              setAmount2(amount1 * token1.price / token.price)
            }
            else if (!isNil(amount2)) {
              setAmount1(amount2 * token.price / token1.price)
            }
          }
        }}
        value={amount2}
        onChangeValue={amount => {
          setAmount2(amount)
          if (!isNil(amount) && !isNil(token1) && !isNil(token2)) {
            const newAmount1 = amount * token2.price / token1.price
            if (newAmount1 !== amount1)
              setAmount1(newAmount1)
          }
        }}
      />
      <DetailsPanel />
      {errors.length > 0 && (
        <ul className='text-red-400 text-sm pl-3 my-1'>
          {errors.map((error, index) => (<li key={index}>{error.message}</li>))}
        </ul>
      )}
      <div className='mt-1'>
        <button
          className={clsx('w-full', isProcessing && 'cursor-progress')}
          onClick={onSwap}
          disabled={isProcessing}
        >
          Swap
        </button>
      </div>
    </main >
  )
}