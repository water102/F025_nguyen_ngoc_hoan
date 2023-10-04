import { useCallback, useMemo, useState } from 'react'
import { Autocomplete, Modal, TextField, } from '@mui/material'

import { useAppContext } from '../app-context'
import { Token } from '../helpers'
import classes from './modal-token.module.scss'
import { clsx } from 'clsx'
import { isEmpty, isNil } from 'ramda'

export const ModalToken = ({
  open,
  onClose,
  onChange,
}: {
  open: boolean,
  onClose: () => void,
  onChange: (token: Token) => void,
}) => {
  const {
    tokensData,
  } = useAppContext()

  const selectToken = useCallback(
    (token: Token) => () => {
      onChange(token)
      onClose()
    },
    [],
  )

  const [selectedTokenData, setSelectedTokenData] = useState<Token | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const onInputChange = (_e: unknown, v: string, r: string) => {
    if (r === 'reset')
      return
    setSearchTerm(v.toLocaleLowerCase())
  }
  const filteredTokensData: Token[] = useMemo(
    () => {
      const filteredRecords = isEmpty(searchTerm) ? tokensData : tokensData.filter(
        tokenData => tokenData.currency.toLocaleLowerCase().includes(searchTerm)
      )

      return isNil(selectedTokenData) ? filteredRecords : filteredRecords.filter(tokenData => tokenData.currency === selectedTokenData.currency)
    },
    [tokensData, searchTerm, selectedTokenData])

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className='h-full w-full flex items-center justify-center'>
        <div className={clsx('w-1/2 h-1/2 flex flex-col gap-3', classes.container)}>
          <Autocomplete
            disablePortal
            onInputChange={onInputChange}
            options={tokensData}
            getOptionLabel={(option) => option.currency}
            renderInput={(params) => <TextField
              {...params}
              placeholder='Search by token name'
            />}
            value={selectedTokenData}
            onChange={(_event, data) => {
              setSelectedTokenData(data)
            }}
            className='bg-white'
          />
          <hr />
          <div className='flex flex-col flex-grow gap-3 overflow-auto'>
            {filteredTokensData.map((token) => (
              <div
                key={token.currency}
                className='flex justify-between cursor-pointer hover:bg-slate-300 hover:text-black'
                onClick={selectToken(token)}
              >
                <div className='flex gap-1'>
                  <img width={24} height={24} src={token.iconUrl} />
                  <span>{token.currency}</span>
                </div>
                <span>
                  {token.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}