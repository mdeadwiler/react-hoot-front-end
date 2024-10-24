
const deleteHoot = async (hootId) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

    });
    return res.json();

  } catch (error) {
    console.log(error);
  }
}

export { index, show, create, createComment, deleteHoot, };