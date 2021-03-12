class AddVillagersToReviews < ActiveRecord::Migration[6.1]
  def change
    add_reference :reviews, :villager, null: false, foreign_key: true
  end
end
