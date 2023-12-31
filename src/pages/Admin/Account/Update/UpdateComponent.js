import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import accountService from '~/services/accountService';
import decentralizationService from '~/services/decentralizationService';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(style);
function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [accountID] = useState(props.accountID);
    const [userName, setUserName] = useState(props.userName);
    const [password, setPassword] = useState(props.password);
    const [email, setEmail] = useState(props.email);
    const [status, setStatus] = useState(props.status);
    const [decentralizationID, setDecentralizationID] = useState(props.decentralizationID);
    const [avatar, setAvatar] = useState(props.avatar);
    const [fullName, setFullName] = useState(props.fullName);
    const [phone, setPhone] = useState(props.phone);
    const [address, setAddress] = useState(props.address);
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await decentralizationService.getAll();
            setType(response);
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('accountID', accountID);
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('status', status);
        formData.append('decentralizationID', decentralizationID);
        formData.append('avatar', avatar);
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('address', address);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        const response = await accountService.update(formData);

        props.setUpdate(new Date());

        toast.success(response.data.message);

        initModal();
    };

    return (
        <>
            <ToastContainer position="bottom-right" />
            <Button variant="success" onClick={initModal} style={{ fontSize: '16px' }}>
                Sửa
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Sửa</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <input
                            type="text"
                            placeholder="Nhập tài khoản"
                            value={userName}
                            className={cx('modal-input')}
                            onChange={(event) => setUserName(event.target.value)}
                            disabled={true}
                        />
                        <input
                            type="text"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            className={cx('modal-input')}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Nhập Email"
                            value={email}
                            className={cx('modal-input')}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Nhập tên khách hàng"
                            value={fullName}
                            className={cx('modal-input')}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            className={cx('modal-input')}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            className={cx('modal-input')}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                        <select
                            value={status}
                            className={cx('modal-input')}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                        {type.data !== undefined && (
                            <select
                                value={decentralizationID}
                                className={cx('modal-input')}
                                onChange={(event) => setDecentralizationID(event.target.value)}
                            >
                                {type.data.map((item) => (
                                    <option key={item.decentralizationID} value={item.decentralizationID}>
                                        {item.authorityName}
                                    </option>
                                ))}
                            </select>
                        )}
                        <input
                            type="file"
                            className={cx('modal-input')}
                            onChange={(event) => setAvatar(event.target.files[0])}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark">
                            Sửa
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default UpdateComponent;
