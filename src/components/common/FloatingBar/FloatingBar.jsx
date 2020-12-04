import React from 'react' 
import { IconButton, Tooltip } from '@material-ui/core'
import styles from './FloatingBar.module.css'


const FloatingBar = ({ options, mainOption, disabled }) => {
    // const [ active, setActive ] = React.useState(false)

    // const mainButtonHandler = () => {
    //     if(active) mainOption.primaryAction()
    //     else mainOption.secondaryAction()
    //     setActive(!active)
    // }

    return(
        <div className={styles.FloatBarContainer}>
            <div className={styles.FloatingBar}>
                    <Tooltip title={mainOption.title}>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={mainOption.action} disabled={disabled}>
                                {mainOption.icon}
                        </IconButton>
                    </Tooltip>
                    <div>
                    {
                        options.map((option, index) => {
                            return(
                                <Tooltip title={option.title} key={index}>
                                    <IconButton color="primary" aria-label="add to shopping cart" onClick={option.action} >
                                        { option.icon }
                                    </IconButton>
                                </Tooltip>
                            )
                        })
                    }
                    </div>
            </div>
        </div>
    )
}


export default FloatingBar;