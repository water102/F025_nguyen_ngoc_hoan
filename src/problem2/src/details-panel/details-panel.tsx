
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import classes from './details-panel.module.scss'
import { useState } from 'react';
import { useAppContext } from '../app-context';

export const DetailsPanel = () => {
  const [open, setOpen] = useState(false)

  const {
    token1,
    token2,
  } = useAppContext()

  return token1 && token2 && (
    <div className={classes.container}>
      <div className='flex justify-between mb-1'>
        <div className='flex gap-1'>
          <span>1 {token1.currency} = {token1.price / token2.price} {token2.currency}</span>
          <span className='text-[#575757]'>($x.xx)</span>
        </div>
        <div
          className='flex items-center gap-1 text-[#575757] cursor-pointer'
          onClick={() => setOpen(value => !value)}
        >
          <LocalGasStationIcon fontSize='small' />
          <span>($x.xx)</span>
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
      </div>
      {open && <div className={classes.content}>
        <div className={classes.line}></div>
        <div className='flex justify-between'>
          <div className='text-[#575757]'>
            Network fee
          </div>
          <div>
            ~$x.xx
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='text-[#575757]'>
            Price Impact
          </div>
          <div>
            xx.xx%
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='text-[#575757]'>
            Minimum output
          </div>
          <div>
            xx.xx% {token2.currency}
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='text-[#575757]'>
            Expected output
          </div>
          <div>
            xx.xx% {token2.currency}
          </div>
        </div>
        <div className={classes.line}></div>
        <div className='flex justify-between'>
          <div className='text-[#575757]'>
            Order routing
          </div>
          <div>
            Uniswap API
          </div>
        </div>
      </div>}
    </div>
  )
}