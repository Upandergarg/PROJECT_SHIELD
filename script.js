



// Suggestion dropdown
const suggestBtn = document.getElementById('suggestBtn');
const suggestMenu = document.getElementById('suggestMenu');
suggestBtn?.addEventListener('click', () => suggestMenu.classList.toggle('hidden'));
document.addEventListener('click', (e) => {
  if (!suggestBtn.contains(e.target) && !suggestMenu.contains(e.target)) {
    suggestMenu.classList.add('hidden');
  }
});

// Sidebar toggle
const openSidebar = document.getElementById('openSidebar');
const sidebar = document.getElementById('sidebar');
openSidebar?.addEventListener('click', () => sidebar.classList.toggle('hidden'));

// Profile dropdown
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
profileBtn?.addEventListener('click', () => profileMenu.classList.toggle('hidden'));
document.addEventListener('click', (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.add('hidden');
  }
});

// Toast helper
function toast(msg, bg = "linear-gradient(to right,#00b09b,#96c93d)") {
  Toastify({ text: msg, duration: 2000, gravity: "top", position: "right", backgroundColor: bg }).showToast();
}

// Auth state
function setLoggedInUI(isLoggedIn) {
  if (isLoggedIn) {
    profileMenu.innerHTML = `
      <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" id="myProfileBtn">My Profile</button>
      <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" id="logoutBtn">Logout</button>
    `;
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.setItem('loggedIn','false');
      setLoggedInUI(false);
      toast("Logged out 🚪", "red");
    });
  } else {
    profileMenu.innerHTML = `
      <button data-open="loginModal" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Login</button>
      <button data-open="signupModal" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Sign Up</button>
    `;
    profileMenu.querySelectorAll('[data-open]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open');
        document.getElementById(id).classList.remove('hidden');
        profileMenu.classList.add('hidden');
      });
    });
  }
}

// Close modals
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-close');
    document.getElementById(id).classList.add('hidden');
  });
});
['loginModal','signupModal'].forEach(id=>{
  const modal=document.getElementById(id);
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.add('hidden'); });
});


setLoggedInUI(localStorage.getItem('loggedIn') === 'true');

// Feed like/comment logic
function likePost(btn){
  let span = btn.querySelector("span");
  span.textContent = parseInt(span.textContent)+1;
  btn.classList.add("font-bold","text-blue-800");
}
function commentPost(btn){
  const comment = prompt("Enter your comment:");
  if(comment){
    let container = btn.closest("div").nextElementSibling;
    let div = document.createElement("div");
    div.className = "flex items-start gap-2";
    let img = document.createElement("img");
    img.src = "https://randomuser.me/api/portraits/lego/1.jpg"; 
    img.className = "w-8 h-8 rounded-full ring-2 ring-green-400 shadow-sm object-cover";
    let p = document.createElement("p");
    p.className = "bg-gray-100 px-3 py-1 rounded-lg";
    p.textContent = "You: " + comment;
    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
  }
}
