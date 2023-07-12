import React, { useState, useEffect } from "react";
import "./App.css";
import { PageEnum, Recipies } from "./components/table/Table";
import RecipiesFavorites from "./components/RecipiesFavorites";
import AddRecipies from "./components/AddRecipies";
import EditRecipies from "./components/EditRecipies";

const App = () => {
  const [recipieList, setRecipieList] = useState<Recipies[]>([]);
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState<Recipies | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [addTerm, setAddTerm] = useState(false);
  const [favoritesList, setFavoritesList] = useState<Recipies[]>([]);

  const [updateTerm, setUpdateTerm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipies | null>(null);

  const deleteRecipies = (data: Recipies) => {
    setRecipeToDelete(data);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const backAdd = () => {
    setAddTerm(false);
  };

  const backUpdate = () => {
    setUpdateTerm(false);
  };

  const _setFavoritesList = (list: Recipies[]) => {
    setFavoritesList(list);
    window.localStorage.setItem("FavoritesList", JSON.stringify(list));
  };

  const confirmDelete = () => {
    if (recipeToDelete) {
      const tempList = recipieList.filter(
        (recipe) => recipe.id !== recipeToDelete.id
      );
      const tempList1 = favoritesList.filter(
        (recipe) => recipe.id !== recipeToDelete.id
      );
      _setRecipieList(tempList);
      _setFavoritesList(tempList1);
    }
    setShowDeleteModal(false);
  };

  const _setRecipieList = (list: Recipies[]) => {
    setRecipieList(list);
    window.localStorage.setItem("RecipieList", JSON.stringify(list));
  };

  useEffect(() => {
    const favoritesListFromStorage =
      window.localStorage.getItem("FavoritesList");
    const recipieListFromStorage = window.localStorage.getItem("RecipieList");

    if (favoritesListFromStorage) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      _setFavoritesList(JSON.parse(favoritesListFromStorage));
    }

    if (recipieListFromStorage) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      _setRecipieList(JSON.parse(recipieListFromStorage));
    }
  }, []);

  const onAddRecipies = () => {
    setShownPage(PageEnum.list);
    setAddTerm(true);
  };

  const addRecipies = (data: Recipies) => {
    _setRecipieList([...recipieList, data]);
    setAddTerm(false);
  };

  const editRecipiesData = (data: Recipies) => {
    setShownPage(PageEnum.list);
    setDataToEdit(data);
    setUpdateTerm(true);
  };

  const updateData = (data: Recipies) => {
    const tempList = recipieList.map((recipe) =>
      recipe.id === data.id ? data : recipe
    );
    const tempList1 = favoritesList.map((recipe) =>
      recipe.id === data.id ? data : recipe
    );
    _setRecipieList(tempList);
    _setFavoritesList(tempList1);
    setUpdateTerm(false);
  };

  const toggleFavorite = (data: Recipies) => {
    const isFavorite = favoritesList.some((item) => item.id === data.id);

    let updatedFavorites: Recipies[];
    let updatedRecipieList: Recipies[];

    if (!isFavorite) {
      // Prebacivanje iz svih recepata u favorite
      updatedFavorites = [...favoritesList, { ...data, favorite: true }];
      updatedRecipieList = recipieList.filter((item) => item.id !== data.id);
    } else {
      // Prebacivanje iz favorite u sve recepte
      updatedFavorites = favoritesList.filter((item) => item.id !== data.id);
      updatedRecipieList = [...recipieList, { ...data, favorite: false }];
    }

    _setFavoritesList(updatedFavorites);
    _setRecipieList(updatedRecipieList);

    localStorage.setItem("FavoritesList", JSON.stringify(updatedFavorites));
    localStorage.setItem("RecipieList", JSON.stringify(updatedRecipieList));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipies = recipieList.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <article className="header">
        <header>
          <h1>CookBook</h1>
          <input
            type="text"
            placeholder="Search recipes"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <input type="button" value="Add Recipes" onClick={onAddRecipies} />
        </header>
      </article>
      <section className="middle">
        <>
          <button>All Recipes</button>
          {showDeleteModal && recipeToDelete && (
            <div className="modal">
              <div className="modal-content">
                <p>Are you sure you want to delete {recipeToDelete.name}?</p>
                <button onClick={confirmDelete}>Delete</button>
                <button onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          )}
        </>
        {shownPage === PageEnum.list && (
          <>
            {filteredRecipies.length > 0 ? (
              <RecipiesFavorites
                list={filteredRecipies}
                onDeleteClick={deleteRecipies}
                onEdit={editRecipiesData}
                onFavoriteToggle={toggleFavorite}
              />
            ) : (
              <p>No recipes found</p>
            )}
          </>
        )}
        {addTerm && (
          <AddRecipies onBackBtnClick={backAdd} onSubmitClick={addRecipies} />
        )}
        {updateTerm && (
          <EditRecipies
            data={dataToEdit}
            onBackBtnClick={backUpdate}
            onUpdateClick={updateData}
          />
        )}
        {shownPage === PageEnum.list && (
          <>
            <button>Favorites</button>
            {favoritesList.length > 0 ? (
              <RecipiesFavorites
                list={favoritesList}
                onDeleteClick={deleteRecipies}
                onEdit={editRecipiesData}
                onFavoriteToggle={toggleFavorite}
              />
            ) : (
              <p>No favorite recipes found</p>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default App;
