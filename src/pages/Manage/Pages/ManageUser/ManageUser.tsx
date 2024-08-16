import { User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useEffect } from "react"
import { auth, db } from "src/firebase"

export default function ManageUser() {
  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docSnap = await getDoc(doc(db, "UserList", (user as User).uid))
      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log(data)
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <div>User</div>
}
