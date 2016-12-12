import apiRequest from '../apiBase/apiRequest';

const remove = (apiOptions, fullname, spam) => {
    // Remove a link, comment, or modmail message.
    const body = {
    	id: fullname,
    	spam: spam
    };

    return apiRequest(apiOptions, 'POST', 'api/remove', { body, type: 'form' });
}

const approve = (apiOptions, fullname) => {
    // Approve a link or comment
    const body = { id: fullname };
    return apiRequest(apiOptions, 'POST', 'api/approve', { body, type: 'form' });
}

export default { remove, approve }