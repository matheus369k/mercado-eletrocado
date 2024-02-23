import { Route, Routes } from "react-router-dom"
import { Fragment } from "react"

import { appUseSelector } from "../store/hook"
import { PropsSetCheckSucceCheck } from "../@types/types-interfaces"

import { Login, UserProfile, UserRegister } from "../page/user"
import { Car, FormPay } from "../page/car"
import Home from "../page/home/Home"
import { ReloadPageAddclassElements } from "../share/modules"

export default function PagesRoutes({ checkOutBtn, setCheckOutBtn, setSuccessBuy }: PropsSetCheckSucceCheck) {
    const useSelectoruser = appUseSelector(state => state.user);
    ReloadPageAddclassElements("nav-element", "currentBar");

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/car' element={checkOutBtn ? <FormPay setCheckOutBtn={setCheckOutBtn} setSuccessBuy={setSuccessBuy} /> : <Car setCheckOutBtn={setCheckOutBtn} />} />
            <Route path='/user' element={Object.values(useSelectoruser).length > 0 ?
                (
                    <UserProfile />
                ) : (
                    <Fragment>
                        {document.cookie ?
                            (
                                <Login />
                            ) : (

                                <UserRegister />

                            )
                        }
                    </Fragment>
                )
            }
            />
        </Routes>
    )
}
