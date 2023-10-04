import { isNil } from 'ramda';
import { clsx } from 'clsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import classes from './token-panel.module.scss'
import { ChangeEvent, useEffect, useState } from 'react';
import { ModalToken } from '../modal-token';
import { Token } from '../helpers';

export const TokenPanel = ({
  label,
  token,
  onChange,
  value,
  onChangeValue,
}: {
  label: string,
  token: Token | undefined,
  onChange: (token: Token) => void,
  value: number | null,
  onChangeValue: (value: number | null) => void,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [typingValue, setTypingValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      const val = Number(typingValue)
      onChangeValue(isNaN(val) ? null : val)
    }, 300);
    return () => {
      clearTimeout(handler)
    }
  }, [typingValue])

  useEffect(() => {
    setTypingValue((currentTypingValue) => {
      const nVal = isNil(value) ? '' : value + ''
      if (currentTypingValue !== nVal)
        return nVal
      return currentTypingValue
    })
  }, [value])

  return (
    <>
      <div className={clsx('relative flex flex-col', classes.container)}>
        <div>
          {label}
        </div>
        <div>
          <input
            className={classes.input}
            value={typingValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTypingValue(event.target.value)}
          />
        </div>
        {token && <div>
          <div>
            ${(token.price * (isNil(value) ? 0 : value)).toFixed(2)}
          </div>
        </div>}
        <div className='absolute top-3 right-3'>
          <button onClick={() => setOpenModal(true)}>
            <div className='flex items-center gap-1'>
              {token ? (
                <>
                  <div>
                    <img
                      className={classes.tokenIcon}
                      src={token?.iconUrl}
                      alt="token logo"
                    />
                  </div>
                  <span>
                    {token?.currency}
                  </span>
                </>
              ) : (
                <span>Select token</span>
              )}
              <KeyboardArrowDownIcon />
            </div>
          </button>
        </div>
      </div>
      {openModal && <ModalToken
        open={openModal}
        onClose={() => setOpenModal(false)}
        onChange={onChange}
      />}
    </>
  )
}