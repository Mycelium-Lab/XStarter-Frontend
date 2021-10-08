import React from 'react';

function AdminPage(props) {
    const { handleChange } = props;
    return (
        <div className="xs-body-admin">
            <div className="xs-admin">
                <div className="xs-admin-row-blocks">
                    <div className="xs-admin-block">
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Название токена</div>
                            <input/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Сумма, которую необходимо собрать</div>
                            <input/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Минимальная сумма (eth)</div>
                            <div className="xs-admin-min-sum-inputs ">
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                            </div>
                        </div>
                    </div>
                    <div className="xs-admin-block">
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Адрес токена</div>
                            <input/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Адрес кошелька создателя токена</div>
                            <input/>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Даты начала и конца сейла</div>
                            <div className="xs-admin-sale-dates">
                                <input/>
                                <input/>
                            </div>
                        </div>
                        <div className="xs-admin-input">
                            <div className="xs-admin-text">Ссылка на информацию</div>
                            <input/>
                        </div>
                    </div>
                </div>
                <button className="btn xs-admin-button">Сохранить</button>
            </div>

        </div>
    );
}

export default AdminPage;