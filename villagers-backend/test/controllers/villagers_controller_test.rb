require "test_helper"

class VillagersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @villager = villagers(:one)
  end

  test "should get index" do
    get villagers_url, as: :json
    assert_response :success
  end

  test "should create villager" do
    assert_difference('Villager.count') do
      post villagers_url, params: { villager: { img_url: @villager.img_url, name: @villager.name } }, as: :json
    end

    assert_response 201
  end

  test "should show villager" do
    get villager_url(@villager), as: :json
    assert_response :success
  end

  test "should update villager" do
    patch villager_url(@villager), params: { villager: { img_url: @villager.img_url, name: @villager.name } }, as: :json
    assert_response 200
  end

  test "should destroy villager" do
    assert_difference('Villager.count', -1) do
      delete villager_url(@villager), as: :json
    end

    assert_response 204
  end
end
