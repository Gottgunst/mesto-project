import { path, workData } from './api.js';

// ########################
// Profile Form Data
// ########################

export async function handleProfileFormSubmit(profile, {form}) {

  const res = await workData(path.user, 'patch',
  {
    name: form.name.value,
    about: form.subtitle.value
  });

  profile.name.textContent = res.name;
  profile.subtitle.textContent = res.about;
}

// ########################
// Image Form Data
// ########################

export async function handleImageFormSubmit({form}) {
  return await workData(path.cards, 'post',
  {
    name: form.title.value,
    link: form.url.value,
  });
}

// ########################
// Avatar Form Data
// ########################

export async function handleAvatarFormSubmit({form}) {
  return await workData(path.avatar, 'PATCH', {
    avatar: form.urlAvatar.value
  });
}
